import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

// Server URL
const url = 'http://localhost:8080/gs-guide-websocket'

// App state
export const state = () => ({
  welcome: 'WebSocket connection:',
  received_messages: [],
  send_message: null,
  connected: false
})

// Getters
export const getters = {
  isConnected: state => state.connected,
  isReceivedMessages: state => state.received_messages
}

// State mutations
export const mutations = {
  // Connect WS server
  CONNECT_SERVER (state, payload) {
    state.connected = payload
  },

  // Disconnect WS server
  DISCONNECT_SERVER (state, payload) {
    state.connected = payload
  },

  // Disconnect WS server
  RECEIVED_MESSSAGES (state, payload) {
    state.received_messages.push(payload)
  }
}

// State actions
export const actions = {

  // Socket connect
  serverConnect ({ commit }) {
    this.socket = new SockJS(url)
    this.stompClient = Stomp.over(this.socket)
    this.stompClient.connect(
      {},
      (frame) => {
        commit('CONNECT_SERVER', true)
        console.log(frame)
        this.stompClient.subscribe('/topic/greetings', (tick) => {
          console.log('hey', tick)
          commit('RECEIVED_MESSSAGES', (JSON.parse(tick.body).content))
        })
      },
      (error) => {
        console.log(error)
        commit('CONNECT_SERVER', false)
      }
    )
  },

  // Socket disconnect
  serverDisconnect ({ commit }) {
    if (this.stompClient) {
      this.stompClient.disconnect()
    }
    commit('DISCONNECT_SERVER', false)
  },

  // Send message
  sendMessage ({ commit }, message) {
    console.log('Send message:' + message)
    if (this.stompClient && this.stompClient.connected) {
      const msg = { name: message }
      console.log(JSON.stringify(msg))
      this.stompClient.send('/app/hello',
        JSON.stringify(msg), {})
    }
  },

  // Tickle connnection
  tickleConnection () {
    this.state.connected ? this.disconnect() : this.connect()
  }
}
