describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        //http://localhost:9009/?path=/story/todolists-additemform--add-item-form-story
        await page.goto('http://localhost:9009/iframe.html?id=todolists-additemform--add-item-form-story')
        //http://localhost:9009/?path=/story/todolists-additemform--add-item-form-story
        //http://localhost:9009/iframe.html?id=/story/todolists-additemform--add-item-form-story
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('editableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer /iframe.html?id=
        await page.goto('http://localhost:9009/iframe.html?id=todolists-editablespan--editable-span-story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})

describe('taskIsDone', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer /iframe.html?id=
        await page.goto('http://localhost:9009/iframe.html?id=todolists-task--task-is-done-story')
        const image = await page.screenshot()

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })
})