//////////////////////////////////////////
//       Discord Bot Config File        //
//////////////////////////////////////////

const config = {
  "developer": [],
  "staff": [],

  "token": "",

  "defaultSettings" : {
    "prefix": ""
  },


  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },
    { level: 1,
      name: "Staff",
      check: (message) => config.staff.includes(message.author.id)
    },
    { level: 2,
      name: "Developer",
      check: (message) => config.developer.includes(message.author.id)
    }
  ]
};

module.exports = config;
