import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Kesedaran } from "../models/kesedaran";
import { v4 as uuid } from 'uuid';

export default class KesedaranStore {
    kesedaranRegistry = new Map<string, Kesedaran>();
    selectedKesedaran: Kesedaran | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get kesedaranByDate() {
        return Array.from(this.kesedaranRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadKesedarans = async () => {
        this.loadingInitial = true;
        try {
            const kesedarans = await agent.Kesedaran.list();
            runInAction(() => {
                kesedarans.forEach(k => this.setKesedaran(k));
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false);
        }
    }

    loadKesedaran = async (id: string) => {
        let kesedaran = this.kesedaranRegistry.get(id);
        if (kesedaran) {
            this.selectedKesedaran = kesedaran;
            return kesedaran;
        } else {
            this.loadingInitial = true;
            try {
                kesedaran = await agent.Kesedaran.details(id);
                this.setKesedaran(kesedaran);
                runInAction(() => this.selectedKesedaran = kesedaran);
                this.loadingInitial = false;
                return kesedaran;
            } catch (error) {
                console.log(error);
                runInAction(() => this.loadingInitial = false);
            }
        }
    }

    private setKesedaran = (kesedaran: Kesedaran) => {
        kesedaran.date = kesedaran.date.split('T')[0];
        this.kesedaranRegistry.set(kesedaran.id, kesedaran);
    }

    createKesedaran = async (kesedaran: Kesedaran) => {
        this.loading = true;
        kesedaran.id = uuid();
        try {
            await agent.Kesedaran.create(kesedaran);
            runInAction(() => {
                this.kesedaranRegistry.set(kesedaran.id, kesedaran);
                this.selectedKesedaran = kesedaran;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateKesedaran = async (kesedaran: Kesedaran) => {
        this.loading = true;
        try {
            await agent.Kesedaran.update(kesedaran);
            runInAction(() => {
                this.kesedaranRegistry.set(kesedaran.id, kesedaran);
                this.selectedKesedaran = kesedaran;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteKesedaran = async (id: string) => {
        this.loading = true;
        try {
            await agent.Kesedaran.delete(id);
            runInAction(() => {
                this.kesedaranRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}
