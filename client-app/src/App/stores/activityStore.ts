import { makeAutoObservable, observable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { FormikErrors } from "formik";

export default class ActivityStore {

    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false; // Initialize the loading property
    loadingInitial = false;
    activities: Activity[] = [];

    constructor() {
        makeAutoObservable(this);
        this.activityRegistry = new Map<string, Activity>();
        this.createActivity = this.createActivity.bind(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.loadingInitial = true;

        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                    this.setActivity(activity);
                });
                this.activities = activities;
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    };

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => (this.selectedActivity = activity));
                this.loadingInitial = false;
                return activity;
            } catch (error) {
                console.log(error);
                this.loadingInitial = false;
            }
        }
    };

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    };

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    };

    async createActivity(activity: Activity): Promise<void> {
        console.log("Before setting loading to true");
        
        runInAction(() => {
          this.loading = true;
        });
        
        activity.id = uuid();
        
        try {
            try {
                await agent.Activities.create(activity);
                runInAction(() => {
                    this.activityRegistry.set(activity.id, activity);
                    this.selectedActivity = activity;
                    this.editMode = false;
                });
            } catch (error) {
                console.log("Caught error:", error);
                throw {
                    title: "An error occurred",
                    category: "An error occurred",
                    description: "An error occurred",
                    date: "An error occurred",
                    city: "An error occurred",
                    venue: "An error occurred",
                };
            }
        } finally {
            console.log("Before setting loading to false");

            runInAction(() => {
                this.loading = false;
            });

            console.log("After setting loading to false");
        }
      }
      

      async updateActivity(activity: Activity): Promise<void> {
        try {
          await agent.Activities.update(activity);
          runInAction(() => {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
          });
        } catch (error) {
          console.log(error);
          runInAction(() => {
            this.loading = false;
          });
          throw {
            title: "An error occurred",
            category: "An error occurred",
            description: "An error occurred",
            date: "An error occurred",
            city: "An error occurred",
            venue: "An error occurred",
          };
        }
      }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
