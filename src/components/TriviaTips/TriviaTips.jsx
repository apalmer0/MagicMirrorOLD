import React from 'react';

import styles from './styles';

const TriviaTips = () => {
  const { tipsStyle } = styles;

  return (
    <div style={tipsStyle}>
      <div>
        To play, say &quot;Hey Google - Answer: C&quot; or &quot;Hey Google - Answer: True&quot;
      </div>
      <div>
        Don&apos;t know the answer? Just guess, or say &quot;Hey Google - new question&quot;
      </div>
    </div>
  );
};

export default TriviaTips;
