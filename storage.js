// storage.js - 處理瀏覽器本機紀錄 (LocalStorage)

const StorageManager = {
    // 儲存資料到 localStorage
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("儲存失敗:", e);
        }
    },

    // 從 localStorage 讀取資料
    load(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // 更新任務狀態
    saveTaskState(taskGroups) {
        const state = {};
        Object.keys(taskGroups).forEach(gid => {
            state[gid] = taskGroups[gid].tasks.filter(t => t.done).map(t => t.id);
        });
        this.save('ffxiv_task_state', state);
    },

    // 更新潛水艇狀態
    saveSubState(parts, needs) {
        const state = {
            parts: parts,
            needs: Array.from(needs.entries())
        };
        this.save('ffxiv_sub_state', state);
    }
};
