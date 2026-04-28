
export default function renderTechnicalSpecs() {
    const target = document.getElementById('spec-table-target') || document.getElementById('specs-table-target');
    const container = document.getElementById('technical-specs-container');
    const metafields = window.productMetafields;

    const cacheKey = `specs_cache_${window.productId}`;
    const cache = 10 * 60 * 1000;

    // SKELETON LOADER
    const showSkeleton = () => {
        if (target) {
            target.innerHTML = `<div class="spec-skeleton"></div>`
        }

        if (container)  container.style.display = 'block';
    };

    // LOAD CACHE
    const loadCache = () => {
        try{
            const raw = localStorage.getItem(cacheKey);
            if (!raw) return null;

            const { timestamp, data } = JSON.parse(raw);
            const expired = Date.now() - timestamp > cacheTTL;

            return expired ? null : data;
        } catch {
            return null;
        }
    };

    // SAVE CACHE
    const saveCache = (data) => {
        localStorage.setItem(
            cacheKey,
            JSON.stringify({
                timestamp: Date.now(),
                data
            })
        );
    };

    // RENDER TABLE
    const renderTable = (specs) => {
        let html = `
            <table class="table" style="width:100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #dfe3e8;">
        `;

        specs.forEach(group => {
            html += `
                <thead>
                    <tr>
                        <th colspan="2" style="background-color: #f5f7fa; padding: 12px; text-align: left; border-bottom: 2px solid #dfe3e8; color: #333;">
                            ${group.group}
                        </th>
                    </tr>
                </thead>
                <tbody>
            `;

            group.attributes.forEach(attr => {
                const unit = attr.unit ? ` ${attr.unit}` : '';
                html += `
                    <tr style="border-bottom: 1px solid #dfe3e8;">
                        <td style="width: 35%; font-weight: 600; padding: 10px; color: #555; background-color: #fafbfc;">${attr.label}</td>
                        <td style="padding: 10px; color: #333;">${attr.value}${unit}</td>
                    </tr>
                `;
            });

            html += `</tbody>`;
        });

        html += `</table>`;

        target.innerHTML = html;
        container.style.display = 'block';
    };

    // MAIN LOGIC
    const init = () => {
        const cached = loadCache();
        if (cached) {
            renderTable(cached);
            return;
        }

        showSkeleton();

        try {
            if (!metafields || !Array.isArray(metafields) || metafields.length === 0) {
                container.style.display = 'none';
                return;
            }

            const rawJson = metafields[0].node.value;
            const specs = JSON.parse(rawJson);

            saveCache(specs);
            renderTable(specs);
        } catch (error) {
            console.error("spec-render.js: Error rendering specs:", error);
            container.style.display = 'none';
        }
    };

    init();
}