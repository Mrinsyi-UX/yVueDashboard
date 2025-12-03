export const OUTPUT_BY_STATION = [
  {
    wc: 1,
    hours: [
      {
        hour: "08:00",
        stations: [
          { station: "ST1", current_output: 3, cumulative_output: 3 },
          { station: "ST2", current_output: 5, cumulative_output: 5 },
          { station: "ST3", current_output: 4, cumulative_output: 4 },
          { station: "ST4", current_output: 2, cumulative_output: 2 },
          { station: "ST5", current_output: 1, cumulative_output: 1 },
          { station: "ST6", current_output: 0, cumulative_output: 0 },
          { station: "ST7", current_output: 6, cumulative_output: 6 }
        ]
      },
      {
        hour: "09:00",
        stations: [
          { station: "ST1", current_output: 4, cumulative_output: 7 },
          { station: "ST2", current_output: 6, cumulative_output: 11 },
          { station: "ST3", current_output: 5, cumulative_output: 9 },
          { station: "ST4", current_output: 3, cumulative_output: 5 },
          { station: "ST5", current_output: 2, cumulative_output: 3 },
          { station: "ST6", current_output: 1, cumulative_output: 1 },
          { station: "ST7", current_output: 5, cumulative_output: 11 }
        ]
      },
      {
        hour: "10:00",
        stations: [
          { station: "ST1", current_output: 5, cumulative_output: 12 },
          { station: "ST2", current_output: 8, cumulative_output: 19 },
          { station: "ST3", current_output: 7, cumulative_output: 16 },
          { station: "ST4", current_output: 4, cumulative_output: 9 },
          { station: "ST5", current_output: 3, cumulative_output: 6 },
          { station: "ST6", current_output: 2, cumulative_output: 3 },
          { station: "ST7", current_output: 6, cumulative_output: 17 }
        ]
      },
      {
        hour: "11:00",
        stations: [
          { station: "ST1", current_output: 6, cumulative_output: 18 },
          { station: "ST2", current_output: 7, cumulative_output: 26 },
          { station: "ST3", current_output: 6, cumulative_output: 22 },
          { station: "ST4", current_output: 5, cumulative_output: 14 },
          { station: "ST5", current_output: 4, cumulative_output: 10 },
          { station: "ST6", current_output: 3, cumulative_output: 6 },
          { station: "ST7", current_output: 7, cumulative_output: 24 }
        ]
      }
    ]
  },

  // ======================================================================
  // Workcell 2 — randomly generated realistic output pattern
  // ======================================================================
  {
    wc: 2,
    hours: [
      {
        hour: "08:00",
        stations: [
          { station: "ST1", current_output: 2, cumulative_output: 2 },
          { station: "ST2", current_output: 3, cumulative_output: 3 },
          { station: "ST3", current_output: 4, cumulative_output: 4 },
          { station: "ST4", current_output: 1, cumulative_output: 1 },
          { station: "ST5", current_output: 0, cumulative_output: 0 },
          { station: "ST6", current_output: 2, cumulative_output: 2 },
          { station: "ST7", current_output: 3, cumulative_output: 3 }
        ]
      },
      {
        hour: "09:00",
        stations: [
          { station: "ST1", current_output: 3, cumulative_output: 5 },
          { station: "ST2", current_output: 4, cumulative_output: 7 },
          { station: "ST3", current_output: 5, cumulative_output: 9 },
          { station: "ST4", current_output: 2, cumulative_output: 3 },
          { station: "ST5", current_output: 1, cumulative_output: 1 },
          { station: "ST6", current_output: 3, cumulative_output: 5 },
          { station: "ST7", current_output: 4, cumulative_output: 7 }
        ]
      },
      {
        hour: "10:00",
        stations: [
          { station: "ST1", current_output: 4, cumulative_output: 9 },
          { station: "ST2", current_output: 6, cumulative_output: 13 },
          { station: "ST3", current_output: 7, cumulative_output: 16 },
          { station: "ST4", current_output: 3, cumulative_output: 6 },
          { station: "ST5", current_output: 2, cumulative_output: 3 },
          { station: "ST6", current_output: 4, cumulative_output: 9 },
          { station: "ST7", current_output: 6, cumulative_output: 13 }
        ]
      },
      {
        hour: "11:00",
        stations: [
          { station: "ST1", current_output: 5, cumulative_output: 14 },
          { station: "ST2", current_output: 7, cumulative_output: 20 },
          { station: "ST3", current_output: 6, cumulative_output: 22 },
          { station: "ST4", current_output: 4, cumulative_output: 10 },
          { station: "ST5", current_output: 3, cumulative_output: 6 },
          { station: "ST6", current_output: 5, cumulative_output: 14 },
          { station: "ST7", current_output: 7, cumulative_output: 20 }
        ]
      }
    ]
  }
];
