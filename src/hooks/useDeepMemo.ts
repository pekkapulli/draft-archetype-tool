// As per https://bit.dev/speedlo/hooks/use-deep-memo

import { isEqual } from 'lodash';
import { useRef } from 'react';

/**
 * This hook memoizes a result using deep equality, which is something
 * useMemo() doesn't do out-of-the-box.
 */
export const useDeepMemo = <TKey, TValue>(memoFn: () => TValue, key: TKey): TValue => {
  const ref = useRef<{ key: TKey; value: TValue }>();

  if (!ref.current || !isEqual(key, ref.current.key)) {
    ref.current = { key, value: memoFn() };
  }

  return ref.current.value;
};
