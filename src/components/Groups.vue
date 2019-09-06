<template>
  <div>
    <md-content></md-content>
    <md-content>
      <div :key="group.id +'_group'" v-for="group in groups">
        <md-toolbar :key="group.id +'_grouptoolbar'" @click.native="open(group)">
          <div class="md-toolbar-section-start">{{ group.title }}</div>
          <p>{{ group.info }}{{group.is_open}}, {{ group.is_admin }}</p>
        </md-toolbar>
        <div v-if="group.is_open" class="details">
          <div class="block">
            <h3>
              Jaetut mittaukset
              <md-icon v-if="group.can_add_measures.length > 0" @click.native="group.add_measure = !group.add_measure">library_add</md-icon>
            </h3>
            <md-list>
              <md-list-item v-if="group.add_measure">
                <p
                  :key="group.id+measure.id+'canaddmeasure'"
                  v-for="measure in group.can_add_measures"
                >
                  {{ measure.name }}
                  <md-button
                    :key="group.id+measure.id+'addmeasure'"
                    @click.native="add_measure(group, measure.id)"
                  >Lisää</md-button>
                </p>
              </md-list-item>
                <md-list-item
                  :key="group.id + measure.id + '_groupmeasure'"
                  v-for="measure in group.measures"
                >{{ measure.name }}</md-list-item>
            </md-list>
          </div>
          <div class="block">
            <h3>
              Jäsenet
              <md-icon @click.native="group.add_user = !group.add_user">person_add</md-icon>
            </h3>

            <md-list>
              <md-list-item v-if="group.add_user">
                <md-input 
                                    :key="group.id+'inviteuserinput'"

                v-model="group.invite_user_email"></md-input>
                  <md-button
                    :key="group.id+'inviteuser'"
                    @click.native="invite_user(group)"
                  >Lisää</md-button>

              </md-list-item>
              <md-list-item
                :key="group.id + user.id + '_groupmember'"
                v-for="user in group.members"
              >
                {{ user.user }} {{ user.email }}
                <span v-if="user.is_admin">admin</span>
              </md-list-item>
            </md-list>
          </div>
          <div class="block">
            <h3>Kutsut</h3>
            <md-list>
              <md-list-item
                :key="group.id + user.id + '_groupinvitation'+i"
                v-for="(user,i) in group.invitations"
              >
                {{ user.invited_user }} {{ user.invited_email }}
                <span>{{ user.response }}</span>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </md-content>
  </div>
</template>

<script>
import Repository from "../Repository";

export default {
  name: "Groups",
  data() {
    return {
      groups: [],
      all_measures: []
    };
  },
  mounted() {
    Repository.getMeasures()
      .then(data => (this.all_measures = data))
      .then(() => this.loadGroups());
  },
  methods: {
    loadGroups() {
      Repository.getGroups().then(data => {
        data.forEach(m => {
          m.is_open = false;
          m.add_measure = false;
          m.add_user = false;
          m.invite_user_email = '';
        });
        this.groups = data;
      });
    },
    async open(group) {
      console.log(group);
      if (group.is_open) {
        group.is_open = false;
        return;
      }
      if (group.is_admin) {
        let all_measure_ids = this.all_measures.map(i => i.id);
        await Repository.getGroupMembers(group.id).then(
          data => (group.members = data)
        );
        await Repository.getGroupMeasures(group.id).then(data => {
          group.measures = data;
          let measure_ids = data.map(i => i.id);
          group.can_add_measures = this.all_measures.filter(
            i => !measure_ids.includes(i.id)
          );
        });
        await Repository.getGroupInvitations(group.id).then(
          data => (group.invitations = data)
        );
        group.is_open = true;
      }
    },
    add_measure(group, measure_id) {
      group.is_open = false;
      group.add_measure = false;
      Repository.postGroupMeasure(group.id, measure_id).then(() =>
        this.open(group)
      );
    },
    invite_user(group) {
      console.log(group.invite_user_email)
    }
  }
};
</script>

<style lang="scss">
.block {
  flex-grow: 1;
  flex-wrap: wrap;
}
.details {
  display: flex;
}
h3 {
  display: flex;
  justify-content: space-between;
}
</style>