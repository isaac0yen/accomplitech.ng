import React from 'react';
import FactStrip from './FactStrip';

export default function ProofBand() {
  return (
    <section className="proof" aria-label="Accomplitech in numbers">
      <div className="proof__inner shell">
        <FactStrip />
      </div>
    </section>
  );
}
