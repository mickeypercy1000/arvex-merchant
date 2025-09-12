import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { getAuthToken } from '../../../utils/auth';
import axios from 'axios';

const Teams = ({ showCreateModal, setShowCreateModal }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await axios.get('https://api.arvexpay.com/api/v1/teams', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status === 'success' && response.data.data) {
        setTeams(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  // Team statistics
  const totalTeams = teams.length;
  const activeTeams = teams.filter(team => team.status === 'active').length;
  const totalMembers = teams.reduce((sum, team) => sum + team.members, 0);
  const avgTeamSize = Math.round(totalMembers / totalTeams);

  const handleCreateTeam = async () => {
    if (!newTeam.name.trim()) {
      alert('Team name is required');
      return;
    }

    try {
      setCreating(true);
      const token = getAuthToken();
      const response = await axios.post('https://api.arvexpay.com/api/v1/teams', {
        name: newTeam.name,
        description: newTeam.description || ''
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status === 'success') {
        // Refresh teams list
        await fetchTeams();
        setShowCreateModal(false);
        setNewTeam({ name: '', description: '' });
      }
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Failed to create team. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'None') return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="w-full">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Icon name="Users" size={16} className="text-primary sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Teams</p>
              <p className="text-lg sm:text-2xl font-semibold text-foreground">{teams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-success/10 rounded-lg flex-shrink-0">
              <Icon name="CheckCircle" size={16} className="text-success sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Active Teams</p>
              <p className="text-lg sm:text-2xl font-semibold text-foreground">{teams.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-blue/10 rounded-lg flex-shrink-0">
              <Icon name="User" size={16} className="text-blue sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Members</p>
              <p className="text-lg sm:text-2xl font-semibold text-foreground">0</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-warning/10 rounded-lg flex-shrink-0">
              <Icon name="BarChart3" size={16} className="text-warning sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-muted-foreground truncate">Avg Team Size</p>
              <p className="text-lg sm:text-2xl font-semibold text-foreground">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-primary mx-auto mb-2"></div>
            <span className="text-sm sm:text-base text-muted-foreground">Loading teams...</span>
          </div>
        ) : teams.length === 0 ? (
          <div className="p-4 sm:p-6 lg:p-8 text-center">
            <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-3 sm:w-12 sm:h-12 lg:w-12 lg:h-12" />
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-2">No teams yet</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">Create your first team to get started</p>
            <Button onClick={() => setShowCreateModal(true)} iconName="Plus" iconPosition="left" className="text-sm sm:text-base">
              Create Team
            </Button>
          </div>
        ) : (
          <>
            {/* Mobile Cards View - Visible on mobile and tablet */}
            <div className="block md:hidden">
              {teams.map((team) => (
                <div key={team.id} className="border-b border-border p-3 sm:p-4 last:border-b-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm sm:text-base truncate mb-1">{team.name}</h4>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          <span className="font-medium">Created by:</span> {team.creator || 'N/A'}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          <span className="font-medium">Created:</span> {formatDate(team.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Edit" 
                        title="Edit team"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Trash2" 
                        title="Delete team"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View - Visible on medium screens and up */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[150px]">Team Name</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[120px]">Created By</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[120px]">Created</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team) => (
                      <tr key={team.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium text-foreground truncate">{team.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm text-foreground truncate">{team.creator || 'N/A'}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {formatDate(team.created_at)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              iconName="Edit" 
                              title="Edit team"
                              className="h-8 w-8"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              iconName="Trash2" 
                              title="Delete team"
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

      {/* Create Team Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-card rounded-lg border border-border shadow-elevation w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Create New Team</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCreateModal(false)}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Team Name *
                </label>
                <Input
                  value={newTeam.name}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter team name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (Optional)
                </label>
                <Input
                  value={newTeam.description}
                  onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter team description"
                />
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-border flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleCreateTeam} disabled={creating} className="w-full sm:w-auto">
                {creating ? 'Creating...' : 'Create Team'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
