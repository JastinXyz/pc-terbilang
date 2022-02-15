const { Plugin } = require("powercord/entities");

const Settings = require("./src/Settings.jsx");

module.exports = class Compiler extends Plugin {
  async startPlugin() {
    powercord.api.settings.registerSettings("pc-terbilang", {
      category: this.entityID,
      label: "Terbilang",
      render: Settings,
    });

    powercord.api.commands.registerCommand({
      command: "terbilang",
      aliases: ["cardinal", "c", "t"],
      description: "Plugin Powercord yang difungsikan sebagai Cheat atau mungkin membantu? untuk minigame cardinal di Bot Discord Alita.",
      usage: "{c} <input>",
      executor: async (args) => {
        const send = this.settings.get("send", false);

        if (!args[0]) {
          return {
            send: false,
            result: {
              type: "rich",
              title: "ERR. Gunakan:",
              description: `\`${powercord.api.commands.prefix}cardinal < input >\`\n\n\`\`\`* kamu dapat mengirim instan dan Alita akan merekam jawabanmu, aktifkan di Menu Pengaturan Plugin Terbilang. (tidak termasuk pesan error)\`\`\``,
              color: Math.floor(Math.random() * 16777215),
            },
          };
        } else {
          const n = args[0].split(".").join("")
          if(isNaN(n)) {
            return {
              send: false,
              result: {
                type: "rich",
                title: "ERR. Gunakan:",
                description: `\`${args[0]}\` bukanlah nomer yang valid.\n\n\`\`\`* kamu dapat mengirim instan dan Alita akan merekam jawabanmu, aktifkan di Menu Pengaturan Plugin Terbilang. (tidak termasuk pesan error)\`\`\``,
                color: Math.floor(Math.random() * 16777215),
              },
            };
          } else {
            var Terbilang = require("./src/terbilang.min.js");
            const sEmbed = {
              type: "rich",
              title: "Hasil",
              description: `${Terbilang(n)
                .split("milyar")
                .join(
                  "miliar"
                )}\n\n\`\`\`* kamu dapat mengirim instan dan Alita akan merekam jawabanmu, aktifkan di Menu Pengaturan Plugin Terbilang. (tidak termasuk pesan error)\`\`\``,
              color: Math.floor(Math.random() * 16777215),
            };

            return {
              send,
              result: send
                ? `${Terbilang(n)
                    .split("milyar")
                    .join("miliar")}`
                : sEmbed,
            };
          }
        }
      },
    });
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("pc-terbilang");
    powercord.api.commands.unregisterCommand("terbilang");
  }
};
