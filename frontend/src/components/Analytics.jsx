import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiList,
  FiTarget,
} from 'react-icons/fi';

const COLORS = {
  completed: '#22c55e',
  pending: '#f59e0b',
  inProgress: '#8b5cf6',
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#3b82f6',
};

const PIE_COLORS = ['#22c55e', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg border border-gray-100 p-3 text-sm">
        <p className="font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-gray-600">
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = ({ tasks }) => {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
    const todo = tasks.filter((t) => t.status === 'To Do').length;
    const pending = total - completed;
    const completionPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, todo, pending, completionPercent };
  }, [tasks]);

  // Data for pie chart
  const pieData = useMemo(
    () => [
      { name: 'Completed', value: stats.completed },
      { name: 'Pending', value: stats.pending },
    ],
    [stats]
  );

  // Data for bar chart (by priority)
  const barData = useMemo(() => {
    const high = tasks.filter((t) => t.priority === 'High').length;
    const medium = tasks.filter((t) => t.priority === 'Medium').length;
    const low = tasks.filter((t) => t.priority === 'Low').length;
    return [
      { name: 'High', count: high, fill: COLORS.high },
      { name: 'Medium', count: medium, fill: COLORS.medium },
      { name: 'Low', count: low, fill: COLORS.low },
    ];
  }, [tasks]);

  // Data for line chart (tasks over time - by created date)
  const lineData = useMemo(() => {
    const dateMap = {};
    tasks.forEach((task) => {
      if (task.createdAt) {
        const date = new Date(task.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        dateMap[date] = (dateMap[date] || 0) + 1;
      }
    });
    return Object.entries(dateMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [tasks]);

  const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
    <div className="stat-card bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-default hover:border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-xl ${bgColor}`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={FiList}
          label="Total Tasks"
          value={stats.total}
          color="text-blue-600"
          bgColor="bg-blue-100"
        />
        <StatCard
          icon={FiCheckCircle}
          label="Completed"
          value={stats.completed}
          color="text-green-600"
          bgColor="bg-green-100"
        />
        <StatCard
          icon={FiTarget}
          label="In Progress"
          value={stats.inProgress}
          color="text-purple-600"
          bgColor="bg-purple-100"
        />
        <StatCard
          icon={FiClock}
          label="Pending"
          value={stats.pending}
          color="text-amber-600"
          bgColor="bg-amber-100"
        />
        <div className="stat-card bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm p-5 cursor-default text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/20">
              <FiTrendingUp className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{stats.completionPercent}%</p>
          </div>
          <p className="text-sm font-medium text-blue-100">Completion Rate</p>
          {/* Progress bar */}
          <div className="mt-3 w-full bg-white/20 rounded-full h-1.5">
            <div
              className="bg-white rounded-full h-1.5 transition-all duration-500"
              style={{ width: `${stats.completionPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart - Completed vs Pending */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Completed vs Pending
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart - Tasks by Priority */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Tasks by Priority
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={50}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Tasks over time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Tasks Created Over Time
          </h3>
          <div className="h-[250px]">
            {lineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-gray-400">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

