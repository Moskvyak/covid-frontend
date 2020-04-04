import React from 'react';
import { ResponsiveContainer as RCcontainer } from 'recharts';

function ResponsiveContainer(props: any) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <RCcontainer {...props} />
      </div>
    </div>
  );
}

export { ResponsiveContainer };
