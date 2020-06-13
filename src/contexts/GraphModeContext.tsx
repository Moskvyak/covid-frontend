import React from 'react';
export const GraphModeContext = React.createContext({ mode: 'confirmed', updateMode: (mode: string) => {}});