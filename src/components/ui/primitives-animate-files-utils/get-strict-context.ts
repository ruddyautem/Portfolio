import * as React from 'react';

export function getStrictContext<T>(name = 'Context') {
  const Context = React.createContext<T | undefined>(undefined);

  function useStrictContext() {
    const context = React.useContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within a ${name}Provider`);
    }
    return context;
  }

  return [Context.Provider, useStrictContext] as const;
}
