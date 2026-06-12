const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null;

  const names =
    users.length <= 2
      ? users.map((u) => u.username).join(' and ')
      : `${users[0].username} and ${users.length - 1} others`;

  return (
    <div className="flex items-center gap-2 px-12 py-1 animate-fade-in">
      <div className="flex gap-1">
        <span className="typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot" style={{ animationDelay: '200ms' }} />
        <span className="typing-dot" style={{ animationDelay: '400ms' }} />
      </div>
      <span className="text-xs text-dark-400">
        {names} {users.length === 1 ? 'is' : 'are'} typing...
      </span>
    </div>
  );
};

export default TypingIndicator;
