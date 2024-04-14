import React, { useState, useEffect, useCallback } from "react";
import styles from "./AdminPortal.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";

const AdminPortal: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const [usedKeys, setUsedKeys] = useState<string[]>([]); // State to track used keys

  const generateKey = (): string => {
    let newKey: string;
    do {
      newKey = Math.random().toString(36).substr(2, 9);
    } while (keys.includes(newKey)); // Ensure the generated key is unique
    return newKey;
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
      <div className={styles.tabletitle}>
        <h3>Unique Generated Keys</h3>
      </div>
      <table className={styles.tablefill}>
        <thead>
          <tr>
            <th className="text-left">Key</th>
            <th className="text-center">Time Remaining</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {keys.map((key) => (
            <tr key={key}>
              <td className={styles.textCenter}>{key}</td>
              <td className={styles.textCenter}>
                <Timer
                  expirationTime={12 * 60 * 60 * 1000}
                  onExpiration={() => handleKeyExpiration(key)}
                />
              </td>
              <td className={styles.textCenter}>
                {usedKeys.includes(key) ? "Used" : "Unused"}{" "}
                {/* Display status */}
              </td>
              <td className={styles.textCenter}>
                <button
                  className={styles.textCenter}
                  onClick={() => deleteKey(key)}
                >
                  <CancelIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.textCenter} onClick={addKey}>
        Generate Key
      </button>
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
