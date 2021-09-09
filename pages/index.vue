<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div>
        <div id="main-content" class="container">
          <div class="row">
            <div class="col-md-6">
              <form class="form-inline">
                <div class="form-group">
                  <label for="connect">{{ $store.state.welcome }}</label>
                  <button id="connect" class="btn btn-default" type="submit" :disabled="isConnected == true" @click.prevent="connect">
                    Connect
                  </button>
                  <button id="disconnect" class="btn btn-default" type="submit" :disabled="isConnected == false" @click.prevent="disconnect">
                    Disconnect
                  </button>
                  <div>
                    <h1 v-if="isConnected" style="color: green;">
                      Connected! 😃
                    </h1>
                    <h1 v-else style="color: red;">
                      Disconnected!😢
                    </h1>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-6">
              <form class="form-inline">
                <div class="form-group">
                  <label for="name">What is your name?</label>
                  <input id="name" v-model="send_message" type="text" class="form-control" placeholder="Your name here...">
                </div>
                <button id="send" class="btn btn-default" type="submit" @click.prevent="send">
                  Send
                </button>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <table id="conversation" class="table table-striped">
                <thead>
                  <tr>
                    <th>Greetings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in isReceivedMessages" :key="index">
                    <td>{{ item }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      send_message: null
    }
  },
  computed: {
    ...mapGetters(['isConnected', 'isReceivedMessages'])
  },
  mounted () {
    this.$store.dispatch('serverConnect')
  },
  methods: {
    send () {
      this.$store.dispatch('sendMessage', this.send_message)
    },
    connect () {
      this.$store.dispatch('serverConnect')
    },
    disconnect () {
      this.$store.dispatch('serverDisconnect')
    },
    tickleConnection () {
      this.$store.dispatch('tickleConnection')
    }
  }
}
</script>

<style scoped="">
#connect {
  border: solid 1px green;
}
#disconnect {
  border: solid 1px red;
}
#send {
  border: solid 1px teal;
}
#name {
  border: solid 1px teal;
}
</style>
