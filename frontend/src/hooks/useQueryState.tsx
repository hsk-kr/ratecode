import { useLayoutEffect, useState } from 'react';
import useQuery from './useQuery';
import { useNavigate } from 'react-router';

/**
 * null can be a value of query string
 */
const useQueryState = <T extends { toString: () => string }>(
  queryStringKey: string,
  convertFunc: (queryStringValue: string | null) => T | null,
  defaultValue?: T
) => {
  const navigate = useNavigate();
  const query = useQuery();
  const [value, setValue] = useState<T | null>();

  const setValueWrapper = (newValue: T) => {
    query.set(queryStringKey, newValue.toString());
    navigate({
      search: query.toString(),
    });
    setValue(newValue);
  };

  useLayoutEffect(() => {
    const queryStringValue = query.get(queryStringKey);
    if (queryStringValue === null) setValue(defaultValue);
    else setValue(convertFunc(queryStringValue));
  }, []);

  return [value, setValueWrapper] as const;
};

export default useQueryState;
