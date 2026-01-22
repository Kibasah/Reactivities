import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pemantauan } from "../models/pemantauan";
import { v4 as uuid } from 'uuid';

export default class PemantauanStore {
    pemantauanRegistry = new Map<string, Pemantauan>();
    selectedPemantauan: Pemantauan | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    get pemantauanByDate() {
        return Array.from(this.pemantauanRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadPemantauans = async () => {
        this.loadingInitial = true;
        try {
            const pemantauans = await agent.Pemantauan.list();
            runInAction(() => {
                pemantauans.forEach(p => this.setPemantauan(p));
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false);
        }
    }

    loadPemantauan = async (id: string) => {
        let pemantauan = this.pemantauanRegistry.get(id);
        if (pemantauan) {
            this.selectedPemantauan = pemantauan;
            return pemantauan;
        } else {
            this.loadingInitial = true;
            try {
                pemantauan = await agent.Pemantauan.details(id);
                this.setPemantauan(pemantauan);
                runInAction(() => this.selectedPemantauan = pemantauan);
                this.loadingInitial = false;
                return pemantauan;
            } catch (error) {
                console.log(error);
                runInAction(() => this.loadingInitial = false);
            }
        }
    }

    private setPemantauan = (pemantauan: Pemantauan) => {
        pemantauan.date = pemantauan.date.split('T')[0];
        this.pemantauanRegistry.set(pemantauan.id, pemantauan);
    }

    createPemantauan = async (pemantauan: Pemantauan) => {
        this.loading = true;
        pemantauan.id = uuid();
        try {
            await agent.Pemantauan.create(pemantauan);
            runInAction(() => {
                this.pemantauanRegistry.set(pemantauan.id, pemantauan);
                this.selectedPemantauan = pemantauan;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updatePemantauan = async (pemantauan: Pemantauan) => {
        this.loading = true;
        try {
            await agent.Pemantauan.update(pemantauan);
            runInAction(() => {
                this.pemantauanRegistry.set(pemantauan.id, pemantauan);
                this.selectedPemantauan = pemantauan;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deletePemantauan = async (id: string) => {
        this.loading = true;
        try {
            await agent.Pemantauan.delete(id);
            runInAction(() => {
                this.pemantauanRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}
