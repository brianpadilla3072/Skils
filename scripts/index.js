class activity {
    constructor(title, description, url, id) {
      this.title = title;
      this.description = description;
      this.url = url;
      this.id = id;
    }
  }
  class repository_activity {
    constructor() {
      this.activities = [];
      this.next_id = 0;
    }
    createActivity(activity) {
      activity.id = this.next_id++;
      this.activities.push(activity);
    }
    getAllActivities() {
      return this.activities;
    }
    get_activity(id) {
      const activity = this.activities.find((activity) => activity.id === id);
      return activity ? activity : false;
    }
    delete_activity(id) {
      const index = this.activities.findIndex((activity) => activity.id == id);
      if (index !== -1) {
        this.activities.splice(index, 1);
        return true;
      }
      return false;
    }
  }