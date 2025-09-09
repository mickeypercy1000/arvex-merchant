import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TeamMembers = ({ showInviteModal, setShowInviteModal }) => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Admin',
      team: 'Development Team',
      status: 'Active',
      joinedDate: '2024-01-15',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@company.com',
      role: 'Manager',
      team: 'Marketing Team',
      status: 'Active',
      joinedDate: '2024-02-20',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Member',
      team: 'Sales Team',
      status: 'Active',
      joinedDate: '2024-01-10',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Member',
      team: 'Support Team',
      status: 'Pending',
      joinedDate: '2024-03-01',
      avatar: null
    }
  ]);

  const [newMember, setNewMember] = useState({
    email: '',
    role: 'Member',
    team: 'Development Team'
  });

  const teams = ['Development Team', 'Marketing Team', 'Sales Team', 'Support Team'];
  const roles = ['Admin', 'Manager', 'Member'];

  const handleInviteMember = () => {
    const newId = Math.max(...teamMembers.map(m => m.id)) + 1;
    const newTeamMember = {
      id: newId,
      name: newMember.email.split('@')[0],
      email: newMember.email,
      role: newMember.role,
      team: newMember.team,
      status: 'Pending',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: null
    };
    
    setTeamMembers(prev => [...prev, newTeamMember]);
    setShowInviteModal(false);
    setNewMember({ email: '', role: 'Member', team: 'Development Team' });
  };

  const handleRemoveMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'Member': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success';
      case 'Pending': return 'bg-warning/10 text-warning';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full">
      {/* Team Members Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Mobile Cards View */}
        <div className="block lg:hidden">
          {teamMembers.map((member) => (
            <div key={member.id} className="border-b border-border p-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        {member.role}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {member.team} • Joined {formatDate(member.joinedDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    iconName="Edit" 
                    title="Edit member"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    iconName="Trash2" 
                    title="Remove member"
                    onClick={() => handleRemoveMember(member.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Member</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Team</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-foreground">
                    {member.team}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {formatDate(member.joinedDate)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Edit" 
                        title="Edit member"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Trash2" 
                        title="Remove member"
                        onClick={() => handleRemoveMember(member.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowInviteModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Invite Team Member</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInviteModal(false)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role
                </label>
                <Select
                  value={newMember.role}
                  onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Team
                </label>
                <Select
                  value={newMember.team}
                  onChange={(e) => setNewMember(prev => ({ ...prev, team: e.target.value }))}
                >
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={() => setShowInviteModal(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleInviteMember} className="w-full sm:w-auto">
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
