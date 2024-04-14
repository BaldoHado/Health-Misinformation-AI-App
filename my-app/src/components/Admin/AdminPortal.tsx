import React, { useState, useEffect, useCallback } from "react";

const AdminPortal: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const generateKey = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const addKey = () => {
    const newKey = generateKey();
    setKeys([...keys, newKey]);
  };

  const deleteKey = (keyToDelete: string) => {
    const updatedKeys = keys.filter((key) => key !== keyToDelete);
    setKeys(updatedKeys);
  };

  const handleKeyExpiration = useCallback(
    (expiredKey: string) => {
      deleteKey(expiredKey);
    },
    [keys]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeys((prevKeys) => {
        // Filter out keys that are older than 12 hours
        return prevKeys.filter((key) => {
          const keyCreationTime = parseInt(key.substring(0, 10), 36) * 1000;
          return Date.now() - keyCreationTime < 12 * 60 * 60 * 1000;
        });
      });
    }, 1000); // Check every second
    return () => clearTimeout(timer);
  }, [keys]);

  return (
    <div>
      <div className="table-title">
        <h3>Unique Generated Keys</h3>
      </div>
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">Key</th>
            <th className="text-left">Time Remaining</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {keys.map((key) => (
            <tr key={key}>
              <td className="text-left">{key}</td>
              <td className="text-left">
                <Timer
                  expirationTime={12 * 60 * 60 * 1000}
                  onExpiration={() => handleKeyExpiration(key)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addKey}>Generate Key</button>
      <ul>
        {keys.map((key) => (
          <li key={key}>
            {key} <button onClick={() => deleteKey(key)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface TimerProps {
  expirationTime: number;
  onExpiration: () => void; // Callback function to handle expiration
}

const Timer: React.FC<TimerProps> = ({ expirationTime, onExpiration }) => {
  const [timeRemaining, setTimeRemaining] = useState(expirationTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1000;
        if (newTime <= 0) {
          clearInterval(timer);
          onExpiration(); // Call the callback function when time expires
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onExpiration]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return <div>{formatTime(timeRemaining)}</div>;
};

export default AdminPortal;
