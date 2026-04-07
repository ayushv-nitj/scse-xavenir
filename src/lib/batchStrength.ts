type BatchStrength = Record<string, number>;

/*
Key Format:
{year}{program}

Examples:
2024ugcs
2025pgcsca
2024pgcsds
*/

const batchStrength: BatchStrength = {
  // ---------- BTECH ----------
  "2022ugcs": 127,
  "2023ugcs": 125,
  "2024ugcs": 126,
  "2025ugcs": 123,

  // ---------- MTECH ----------
  // random values for mtech 2nd year
  "2024pgcsds": 20,
  "2024pgcscs": 20,
  "2024pgcsis": 18,

  "2025pgcsds": 20,
  "2025pgcscs": 20,
  "2025pgcsis": 18,

  // ---------- MCA ----------
  "2024pgcsca": 110,
  "2025pgcsca": 112,
};

export function getBatchStrength(key: string): number {
  return batchStrength[key.toLowerCase()] || 0;
}