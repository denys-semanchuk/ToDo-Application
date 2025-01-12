import React from "react";

export const Notification: React.FC<NotificationProps> = ({ message, type }: NotificationProps) => {
  const bgColor = type === 'error' ? "bg-red-100" : "bg-green-100";
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';
  return (
    <div className={`${bgColor} border-l-4 ${borderColor} p-4 mb-4 rounded animate-fade-in`}>
      <p className={`${textColor} font-medium`}>{message}</p>
    </div>
  );
}

interface NotificationProps {
  message: string;
  type: 'error' | 'success'
}