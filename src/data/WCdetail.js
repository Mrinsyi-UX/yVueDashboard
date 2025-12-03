export const WORKCELLS = [
  {
    id: 1,
    name: "WC 1",
    status: "Running",
    zones: [
      {
        zone_name: "Zone 1",
        stations: [
          { id: 101, name: "Tig 1", status: "Running", qty_in: 13 },
          { id: 102, name: "R1T1", status: "Running", qty_in: 15 }
        ]
      },
      {
        zone_name: "Zone 2",
        stations: [
          { id: 103, name: "R1T3", status: "Idle", qty_in: 0 }
        ]
      }
    ],
    hourly_output: [
      { time: "08:00", output: 10 },
      { time: "09:00", output: 22 },
      { time: "10:00", output: 28 },
      { time: "11:00", output: 31 },
      { time: "12:00", output: 27 },
      { time: "13:00", output: 35 }
    ]
  },

  {
    id: 2,
    name: "WC 2",
    status: "Machine Error",
    zones: [
      {
        zone_name: "Zone A",
        stations: [
          { id: 201, name: "MIG 1", status: "Running", qty_in: 12 },
          { id: 202, name: "MIG 2", status: "Error", qty_in: 0 }
        ]
      }
    ],
    hourly_output: [
      { time: "08:00", output: 5 },
      { time: "09:00", output: 15 },
      { time: "10:00", output: 20 },
      { time: "11:00", output: 18 },
      { time: "12:00", output: 25 },
      { time: "13:00", output: 21 }
    ]
  }
];
