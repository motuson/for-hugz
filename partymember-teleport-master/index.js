const Command = require('command')
const Vec3 = require('tera-vec3')
const config = require('./config.json')

module.exports = function PartymemberTeleport(dispatch) {
  const command = Command(dispatch)

  let keyWords = config.keyWords.slice()
  let instantTp = config.instantTp || false
  let villageList = null
  let teleportTo = null
  let partyMembers = []
  let nextLocation = new Vec3()

  function getVillageId(zone) {
    for (let village in villageList) {
      if (villageList[village].zone == zone) {
        return villageList[village].id
      }
    }
    return 0
  }

  function teleport(target) {
    teleportTo = null
    dispatch.send('C_PCBANGINVENTORY_USE_SLOT', 1, {
      slot: 4
    })
    setTimeout(function() {
      let villageId = getVillageId(target.zone)
      if (villageId == 0) return
      nextLocation = target.loc
      dispatch.send('C_TELEPORT_TO_VILLAGE', 1, {
        id: villageId
      })
    }, 800)
  }

  dispatch.hook('S_VILLAGE_LIST_TO_TELEPORT', 1, event => {
    if (!villageList) {
      villageList = event.locations
    }
  })

  dispatch.hook('S_PARTY_MEMBER_LIST', 7, event => {
    partyMembers = event.members
  })

  dispatch.hook('S_LEAVE_PARTY', 1, event => {
    partyMembers = []
  })

  dispatch.hook('S_PARTY_MEMBER_INTERVAL_POS_UPDATE', 3, event => {
    if (teleportTo) {
      for (let member in partyMembers) {
        if (partyMembers[member].name.toLowerCase() == teleportTo.toLowerCase()) {
          if (partyMembers[member].playerId == event.playerId) {
            teleport(event)
          }
        }
      }
    }
  })

  dispatch.hook('S_CHAT', 2, event => {
    for (let member in partyMembers) {
      if (partyMembers[member].name == event.authorName) {
        for (let i = 0; i < keyWords.length; i++) {
          if (event.message.includes(keyWords[i])) {
            if (instantTp) {
              command.message(' Set teleport Request to: ' + event.authorName)
              teleportTo = event.authorName
            } else {
              command.message(' Info: Detected teleport request, type "/8 pmt toggle" to activate instant teleport requests')
            }
          }
        }
      }
    }
  })

  dispatch.hook('S_LOAD_TOPO', 3, event => {
    if (nextLocation.length() != 0) {
      event.loc = nextLocation
      return true
    }
  })

  dispatch.hook('S_SPAWN_ME', 3, event => {
    if (nextLocation.length() != 0) {
      event.loc = nextLocation
      nextLocation = new Vec3()
      return true
    }
  })

  command.add('pmt', (name) => {
    if (name == 'toggle') {
      instantTp = !instantTp
      command.message(` Instant Teleport is now ${instantTp ? 'enabled' : 'disabled'}.`)
      return
    }
    for (let member in partyMembers) {
      if (partyMembers[member].name.toLowerCase() == name.toLowerCase()) {
        command.message(' Set teleport Request to: ' + name)
        teleportTo = name
        return
      }
    }
    command.message(' Party Member not found: ' + name)
  })

  this.destructor = function() {
    command.remove('pmt')
    delete require.cache[require.resolve('./config.json')]
  }
}
