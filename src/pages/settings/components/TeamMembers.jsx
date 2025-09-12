import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { getAuthToken } from '../../../utils/auth';
import axios from 'axios';

const TeamMembers = ({ showInviteModal, setShowInviteModal }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);

  const [newMember, setNewMember] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    teamId: ''
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    teamId: ''
  });

  useEffect(() => {
    fetchTeams();
    fetchRoles();
    fetchTeamMembers();
  }, []);

  // Set default values when teams and roles are loaded
  useEffect(() => {
    if (teams.length > 0 && roles.length > 0 && !newMember.teamId && !newMember.role) {
      setNewMember(prev => ({
        ...prev,
        teamId: teams[0].id,
        role: roles[0].id
      }));
    }
  }, [teams, roles, newMember.teamId, newMember.role]);

  const fetchTeams = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('https://api.arvexpay.com/api/v1/teams', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Teams API response:', response.data); // Debug log

      if (response.data.status === 'success' && response.data.data) {
        setTeams(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('https://api.arvexpay.com/api/v1/auth/roles', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Roles API response:', response.data); // Debug log

      if (response.data.status === 'success' && response.data.data) {
        console.log('Setting roles:', response.data.data); // Debug log
        setRoles(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Fallback to mock roles if API fails
      const fallbackRoles = [
        { id: 'c894aa1f-ab28-47a1-914f-dd945fead588', name: 'Member' },
        { id: 'admin-role-id', name: 'Admin' },
        { id: 'manager-role-id', name: 'Manager' }
      ];
      setRoles(fallbackRoles);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      // This endpoint might need to be implemented on the backend
      // For now, using empty array
      setTeamMembers([]);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      teamId: ''
    };

    if (!newMember.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }

    if (!newMember.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }

    if (!newMember.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newMember.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!newMember.role) {
      newErrors.role = 'Role is required';
    }

    if (!newMember.teamId) {
      newErrors.teamId = 'Team is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInviteMember = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setInviting(true);
      const token = getAuthToken();
      const response = await axios.post(`https://api.arvexpay.com/api/v1/teams/${newMember.teamId}/invite-member`, {
        firstname: newMember.firstname,
        lastname: newMember.lastname,
        email: newMember.email,
        role: newMember.role
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status === 'success') {
        alert(`Invitation sent successfully! ${response.data.message}`);
        setShowInviteModal(false);
        setNewMember({
          firstname: '',
          lastname: '',
          email: '',
          role: roles[0]?.id || '',
          teamId: teams[0]?.id || ''
        });
        setErrors({
          firstname: '',
          lastname: '',
          email: '',
          role: '',
          teamId: ''
        });
        // Refresh team members list
        fetchTeamMembers();
      }
    } catch (error) {
      console.error('Error inviting member:', error);
      alert('Failed to send invitation. Please try again.');
    } finally {
      setInviting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCloseModal = () => {
    setShowInviteModal(false);
    setErrors({
      firstname: '',
      lastname: '',
      email: '',
      role: '',
      teamId: ''
    });
  };

  const handleRemoveMember = (memberId) => {
    // TODO: Implement remove member API call
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'None') return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'member': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'inactive': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full">
      {/* Team Members Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <span className="text-sm sm:text-base text-muted-foreground">Loading team members...</span>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <Icon name="UserPlus" size={32} className="text-muted-foreground mx-auto mb-3 sm:w-12 sm:h-12 lg:w-12 lg:h-12" />
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-2">No team members yet</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">Invite your first team member to get started</p>
            <Button onClick={() => setShowInviteModal(true)} iconName="UserPlus" iconPosition="left" className="text-sm sm:text-base">
              Invite Member
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile Cards View - Visible on mobile and tablet */}
            <div className="block xl:hidden">
              {teamMembers.map((member) => (
                <div key={member.id} className="border-b border-border p-3 sm:p-4 last:border-b-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm sm:text-base flex-shrink-0">
                        {getInitials(member.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm sm:text-base truncate">{member.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{member.email}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                            {member.role}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </div>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Team:</span> {member.team}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Joined:</span> {formatDate(member.joinedDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Edit" 
                        title="Edit member"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Trash2" 
                        title="Remove member"
                        onClick={() => handleRemoveMember(member.id)}
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View - Visible on large screens */}
            <div className="hidden xl:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[200px]">Member</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[100px]">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[120px]">Team</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[100px]">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[120px]">Joined</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                              {getInitials(member.name)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-foreground truncate">{member.name}</div>
                              <div className="text-sm text-muted-foreground truncate">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground">
                          <span className="truncate block">{member.team}</span>
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
                              className="h-8 w-8"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              iconName="Trash2" 
                              title="Remove member"
                              onClick={() => handleRemoveMember(member.id)}
                              className="h-8 w-8"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
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
                  onClick={handleCloseModal}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    value={newMember.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                    placeholder="Enter first name"
                    className={errors.firstname ? 'border-red-500' : ''}
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    value={newMember.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    placeholder="Enter last name"
                    className={errors.lastname ? 'border-red-500' : ''}
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role *
                </label>
                <Select
                  value={newMember.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={errors.role ? 'border-red-500' : ''}
                >
                  <option value="">Select a role</option>
                  {console.log('Rendering roles dropdown, roles array:', roles)}
                  {roles.map(role => {
                    console.log('Rendering role option:', role);
                    return (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    );
                  })}
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Team *
                </label>
                <Select
                  value={newMember.teamId}
                  onChange={(e) => handleInputChange('teamId', e.target.value)}
                  className={errors.teamId ? 'border-red-500' : ''}
                >
                  <option value="">Select a team</option>
                  {console.log('Rendering teams dropdown, teams array:', teams)}
                  {teams.map(team => {
                    console.log('Rendering team option:', team);
                    return (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    );
                  })}
                </Select>
                {errors.teamId && (
                  <p className="text-red-500 text-xs mt-1">{errors.teamId}</p>
                )}
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={handleCloseModal} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleInviteMember} disabled={inviting} className="w-full sm:w-auto">
                {inviting ? 'Sending Invitation...' : 'Send Invitation'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
