import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lastEvent, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);
      if (loadedData && loadedData.events) {
        setLast(
          loadedData.events.reduce((currentEvent, latestEvent) =>
            new Date(currentEvent.date) > new Date(latestEvent.date)
              ? currentEvent
              : latestEvent
          )
        );
      }
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        lastEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;