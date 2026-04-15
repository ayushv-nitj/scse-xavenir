"use client";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#e2e8f0',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 17, 23, 0.95)',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      borderColor: '#334155',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#64748b',
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
      },
      grid: {
        color: 'rgba(30, 37, 53, 0.5)',
      },
    },
    y: {
      ticks: {
        color: '#64748b',
        font: {
          family: 'Inter, sans-serif',
          size: 11,
        },
      },
      grid: {
        color: 'rgba(30, 37, 53, 0.5)',
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        color: '#e2e8f0',
        font: {
          family: 'Inter, sans-serif',
          size: 12,
        },
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 17, 23, 0.95)',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      borderColor: '#334155',
      borderWidth: 1,
    },
  },
};

interface EventRegistrationChartProps {
  data: { _id: string; count: number; participants: number }[];
}

export const EventRegistrationChart: React.FC<EventRegistrationChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: 'Teams',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
      {
        label: 'Participants',
        data: data.map(item => item.participants),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

interface UserDistributionChartProps {
  totalUsers: number;
  primeUsers: number;
}

export const UserDistributionChart: React.FC<UserDistributionChartProps> = ({ 
  totalUsers, 
  primeUsers 
}) => {
  const nonPrimeUsers = totalUsers - primeUsers;
  
  const chartData = {
    labels: ['Prime Members', 'Regular Users'],
    datasets: [
      {
        data: [primeUsers, nonPrimeUsers],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Doughnut data={chartData} options={doughnutOptions} />
    </div>
  );
};

interface PaymentStatusChartProps {
  pendingPayments: number;
  approvedPayments: number;
  rejectedPayments: number;
}

export const PaymentStatusChart: React.FC<PaymentStatusChartProps> = ({
  pendingPayments,
  approvedPayments,
  rejectedPayments,
}) => {
  const chartData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [
      {
        data: [pendingPayments, approvedPayments, rejectedPayments],
        backgroundColor: [
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Doughnut data={chartData} options={doughnutOptions} />
    </div>
  );
};

interface EventDetailsChartsProps {
  summary: {
    totalTeams: number;
    confirmedTeams: number;
    pendingTeams: number;
    verifiedTeams: number;
    totalPrimeMembers: number;
    totalNitianMembers: number;
    totalCseMembers: number;
    totalParticipants: number;
  };
}

export const EventTeamStatusChart: React.FC<{ summary: EventDetailsChartsProps['summary'] }> = ({ summary }) => {
  const chartData = {
    labels: ['Confirmed', 'Pending', 'Verified'],
    datasets: [
      {
        data: [summary.confirmedTeams, summary.pendingTeams, summary.verifiedTeams],
        backgroundColor: [
          'rgba(0, 255, 179, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgba(0, 255, 179, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Doughnut data={chartData} options={doughnutOptions} />
    </div>
  );
};

export const EventParticipantTypeChart: React.FC<{ summary: EventDetailsChartsProps['summary'] }> = ({ summary }) => {
  const regularMembers = summary.totalParticipants - summary.totalPrimeMembers;
  const nonNitians = summary.totalParticipants - summary.totalNitianMembers;
  const nonCseMembers = summary.totalParticipants - summary.totalCseMembers;

  const chartData = {
    labels: ['Prime Members', 'Regular Members', 'NIT Students', 'Non-NIT', 'CSE Students', 'Non-CSE'],
    datasets: [
      {
        label: 'Count',
        data: [
          summary.totalPrimeMembers,
          regularMembers,
          summary.totalNitianMembers,
          nonNitians,
          summary.totalCseMembers,
          nonCseMembers,
        ],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(156, 163, 175, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(107, 114, 128, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};