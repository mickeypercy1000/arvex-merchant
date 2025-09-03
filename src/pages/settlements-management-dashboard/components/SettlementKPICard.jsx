import React from 'react';
        import { motion } from 'framer-motion';
        import Icon from '../../../components/AppIcon';

        const SettlementKPICard = ({ title, value, change, trend, icon }) => {
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

          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-lg p-6 shadow-elevation hover:shadow-elevation-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={icon} size={20} className="text-primary" />
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

        export default SettlementKPICard;