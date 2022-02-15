const {
  React,
  getModule,
  i18n: { Messages },
} = require("powercord/webpack");

const {
  TextInput,
  SwitchItem,
  ButtonItem,
  Category,
} = require("powercord/components/settings");

module.exports = class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getSetting, toggleSetting, updateSetting } = this.props;

    return (
      <div>
        <SwitchItem
          note="Jika di aktifkan jawaban dari perintah yang anda gunakan akan terkirim seperti chat biasa (Alita juga akan langsung merekan jawaban tersebut)"
          value={getSetting("send", false)}
          onChange={() => toggleSetting("send")}
        >
          Kirim Instan
        </SwitchItem>
      </div>
    );
  }
};
