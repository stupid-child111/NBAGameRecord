import { Button, Form, Field, CellGroup, Icon, Uploader, Picker, Popup } from 'vant';
const vantUIArray = [Button, Form, Field, CellGroup, Icon, Uploader, Picker, Popup];
export default function enrollVantUI(app) {
    vantUIArray.forEach(item => {
        app.use(item);
    })
}