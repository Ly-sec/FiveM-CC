const contextBridge = require('electron').contextBridge;
const ipcRenderer = require('electron').ipcRenderer;

const ipc = {
    'render': {
        // From render to main.
        'send': [
            'ccClear',
            'ccNo'
        ],
        // From main to render.
        'receive': [],
        // From render to main and back again.
        'sendReceive': []
    }
};

contextBridge.exposeInMainWorld(
    // Allowed 'ipcRenderer' methods.
    'ipcRender', {
        // From render to main.
        send: (channel, args) => {
            let validChannels = ipc.render.send;
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, args);
            }
        },
        // From main to render.
        receive: (channel, listener) => {
            let validChannels = ipc.render.receive;
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => listener(...args));
            }
        },
        // From render to main and back again.
        invoke: (channel, args) => {
            let validChannels = ipc.render.sendReceive;
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, args);
            }
        }
    }
);