'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ScopeEstimate } from '@/types';

// Register required elements for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface EffortChartProps {
  scopeEstimate?: ScopeEstimate;
}

export const EffortChart: React.FC<EffortChartProps> = ({ scopeEstimate }) => {
  // Fallback values if data is missing or incomplete
  const frontend = scopeEstimate?.frontend ?? 40;
  const backend = scopeEstimate?.backend ?? 25;
  const design = scopeEstimate?.design ?? 15;
  const testing = scopeEstimate?.testing ?? 15;
  const management = scopeEstimate?.management ?? 5;

  const data = {
    labels: ['Frontend', 'Backend', 'Design', 'Testing', 'Management'],
    datasets: [
      {
        data: [frontend, backend, design, testing, management],
        backgroundColor: [
          '#9B2740', // Primary Red
          '#40252F', // Dark Red
          '#A68C41', // Accent Gold
          '#64748B', // Slate Grey
          '#0F172A', // Navy/Black
        ],
        borderColor: [
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
          '#FFFFFF',
        ],
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#1E293B',
          font: {
            family: 'Inter',
            size: 11,
            weight: 'bold' as const,
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#40252F',
        titleFont: {
          family: 'Inter',
          size: 12,
        },
        bodyFont: {
          family: 'Inter',
          size: 12,
        },
        callbacks: {
          label: function (context: any) {
            return ` ${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    cutout: '65%',
  };

  return (
    <div className="w-full relative flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-[#40252F]">100%</span>
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Effort</span>
      </div>
    </div>
  );
};
