export const workcells = [
  {
    name: "WC 1",
    stations: [
      {
        st: "ST1",
        shift_start: "2025-11-18T08:00:00",
        shift_end:   "2025-11-18T17:00:00",
        current_time:"2025-11-18T15:00:00",

        // ALL anomalies in the shift (history)
        anomalies: [
          {
            start: "2025-11-18T09:00:00",
            end:   "2025-11-18T09:15:00",
            anomalies_flag: ["ms_flag"]   // Material Shortage
          },
          {
            start: "2025-11-18T13:30:00",
            end:   null,                  // still ongoing
            anomalies_flag: ["mc_flag", "qc_flag"]  // Machine failure + QC
          }
        ]
      },

      {
        st: "ST2",
        shift_start: "2025-11-18T08:00:00",
        shift_end:   "2025-11-18T17:00:00",
        current_time:"2025-11-18T15:00:00",
        anomalies: []
      },

      {
        st: "ST3",
        shift_start: "2025-11-18T08:00:00",
        shift_end:   "2025-11-18T17:00:00",
        current_time:"2025-11-18T15:00:00",

        anomalies: [
          {
            start: "2025-11-18T11:08:00",
            end:   "2025-11-18T11:20:00",
            anomalies_flag: ["me_flag"] // Mechanical Error
          }
        ]
      }
    ]
  },

  {
    name: "WC 2",
    stations: [
      {
        st: "ST1",
        shift_start: "2025-11-18T08:00:00",
        shift_end:   "2025-11-18T17:00:00",
        current_time:"2025-11-18T15:00:00",
        anomalies: []
      },
      {
        st: "ST2",
        shift_start: "2025-11-18T08:00:00",
        shift_end:   "2025-11-18T17:00:00",
        current_time:"2025-11-18T15:00:00",

        anomalies: [
          {
            start: "2025-11-18T10:00:00",
            end:   null,
            anomalies_flag: ["qc_flag"]
          }
        ]
      },
      {
        st: "ST3",
        shift_start: "2025-11-18T08:00:00",
        shift_end:   "2025-11-18T17:00:00",
        current_time:"2025-11-18T15:00:00",
        anomalies: []
      }
    ]
  }
];
