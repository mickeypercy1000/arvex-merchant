import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TeamManagementSection = () => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');
  const [inviteFirstName, setInviteFirstName] = useState('');
  const [inviteLastName, setInviteLastName] = useState('');

  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2025-07-20 10:30',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'Manager',
      status: 'active',
      lastLogin: '2025-07-20 09:15',
      joinedDate: '2024-03-22'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Analyst',
      status: 'inactive',
      lastLogin: '2025-07-18 14:45',
      joinedDate: '2024-08-10'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'Viewer',
      status: 'pending',
      lastLogin: 'Never',
      joinedDate: '2025-07-19'
    }
  ];

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const handleInviteUser = () => {
    // Handle user invitation logic
    console.log('Inviting user:', { inviteFirstName, inviteLastName, inviteEmail, inviteRole });
    setShowInviteModal(false);
    setInviteFirstName('');
    setInviteLastName('');
    setInviteEmail('');
    setInviteRole('viewer');
  };

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-3 mb-6">
        <Button onClick={() => setShowInviteModal(true)} iconName="UserPlus" iconPosition="left">
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="UserCheck" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-success">10</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">2</div>
              <div className="text-sm text-muted-foreground">Pending Invites</div>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Admin Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4">Team Members</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Member</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Role</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-medium text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.role === 'Admin' ?'bg-error/10 text-error'
                        : member.role === 'Manager' ?'bg-warning/10 text-warning'
                        : member.role === 'Analyst' ?'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active' ?'bg-success/10 text-success'
                        : member.status === 'pending' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{member.lastLogin}</td>
                  <td className="py-4 px-4 text-muted-foreground">{member.joinedDate}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon-sm" iconName="Edit" title="Edit Role" />
                      <Button variant="ghost" size="icon-sm" iconName="Mail" title="Resend Invite" />
                      <Button variant="ghost" size="icon-sm" iconName="UserMinus" title="Remove" />
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowInviteModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border">
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
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    value={inviteFirstName}
                    onChange={(e) => setInviteFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    value={inviteLastName}
                    onChange={(e) => setInviteLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role
                </label>
                <Select
                  options={roleOptions}
                  value={inviteRole}
                  onChange={setInviteRole}
                  placeholder="Select role"
                />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteUser}>
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagementSection;