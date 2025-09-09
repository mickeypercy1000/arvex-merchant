import React from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';

        const ChargebackKPICard = ({ title, value, change, trend, icon, color = 'primary' }) => {
          const getTrendColor = (trend) => {
            switch (trend) {
              case 'up':
                return 'text-success';
              case 'down':
                return 'text-destructive';
              default:
                return 'text-muted-foreground';
            }
          };

          const getTrendIcon = (trend) => {
            switch (trend) {
              case 'up':
                return 'TrendingUp';
              case 'down':
                return 'TrendingDown';
              default:
                return 'Minus';
            }
          };

          const getIconColor = (color) => {
            const colorMap = {
              primary: 'text-primary bg-primary/10',
              success: 'text-success bg-success/10',
              warning: 'text-warning bg-warning/10',
              destructive: 'text-destructive bg-destructive/10'
            };
            return colorMap[color] || colorMap.primary;
          };

          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-6 shadow-elevation hover:shadow-elevation-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${getIconColor(color)}`}>
                  <Icon name={icon} size={20} />
                </div>
                <div className={`flex items-center space-x-1 ${getTrendColor(trend)}`}>
                  <Icon name={getTrendIcon(trend)} size={14} />
                  <span className="text-sm font-medium">{change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
                <p className="text-sm text-muted-foreground">{title}</p>
              </div>
            </motion.div>
          );
        };

        export default ChargebackKPICard;