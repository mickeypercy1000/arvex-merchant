import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const Teams = ({ showCreateModal, setShowCreateModal }) => {
  const [teams] = useState([
    {
      id: 1,
      name: 'Development Team',
      description: 'Core development and engineering team',
      members: 8,
      created: '2024-01-15',
      lead: 'John Doe',
      status: 'active'
    },
    {
      id: 2,
      name: 'Marketing Team',
      description: 'Digital marketing and growth team',
      members: 5,
      created: '2024-02-20',
      lead: 'Sarah Smith',
      status: 'active'
    },
    {
      id: 3,
      name: 'Sales Team',
      description: 'Sales and business development',
      members: 12,
      created: '2024-01-10',
      lead: 'Mike Johnson',
      status: 'active'
    },
    {
      id: 4,
      name: 'Support Team',
      description: 'Customer support and success',
      members: 6,
      created: '2024-03-01',
      lead: 'Emily Davis',
      status: 'inactive'
    }
  ]);

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: ''
  });

  // Team statistics
  const totalTeams = teams.length;
  const activeTeams = teams.filter(team => team.status === 'active').length;
  const totalMembers = teams.reduce((sum, team) => sum + team.members, 0);
  const avgTeamSize = Math.round(totalMembers / totalTeams);

  const handleCreateTeam = () => {
    // Handle team creation logic here
    console.log('Creating team:', newTeam);
    setShowCreateModal(false);
    setNewTeam({ name: '', description: '' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="w-full">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Teams</p>
              <p className="text-2xl font-semibold text-foreground">{totalTeams}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Teams</p>
              <p className="text-2xl font-semibold text-foreground">{activeTeams}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue/10 rounded-lg">
              <Icon name="User" size={20} className="text-blue" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <p className="text-2xl font-semibold text-foreground">{totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Icon name="BarChart3" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Team Size</p>
              <p className="text-2xl font-semibold text-foreground">{avgTeamSize}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Team Name</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Members</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Created</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-foreground">{team.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{team.members}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">
                    {formatDate(team.created)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      team.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}>
                      {team.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Edit" 
                        title="Edit team"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        iconName="Trash2" 
                        title="Delete team"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              <Button onClick={handleCreateTeam} className="w-full sm:w-auto">
                Create Team
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
