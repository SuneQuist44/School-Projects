# Global Goals Documentation

__English Version__

Global Goals currently have 17 goals, out goal atm is to make a site with all of them displayed, and they should all be clickable, when clicked they will lead you to another page were details of the specefic goal is listed.

There are currently two URI' we can get data from (The data is in JSON format).
* **List:** <https://api.mediehuset.net/sdg/goals>
*  **Details:** <https://api.mediehuset.net/sdg/goals/{{id}}>

Design prototype done: __23-11-2020__ <br>
Github Documentation setup: __23-11-2020__ <br>

## Modal

__Import errorHandling at top of file__

Create a entry function for the errorHandling (**Error Catching**). And make it a try and catch function with out functions from our errorHandling js file.

```js
    function checkEntry() {
        try {}
        catch (err) {}
    }
```

**List** (JSON format) <br>
Data: { <br>
- id, title, byline, color, icon, image, request.type, request.url <br>

}

**Details** (JSON format) <br>
Data: { <br>
- id, title, byline, color, icon, image <br>
- num_targets, **targets**, <br>
    - targets.id, targets.goal_id, targets.sort_number, targets.title, targets.description

}

When errorHandling has been succesfully run, send data to a function that can handle the fecthing (**handleFetching**)

## Controller

Execute **handleFetching**, try and fetch **List**, after send data to another function which can sort the fetched data.

```js
    function handleSortOfList() {
        // Sort data here
        /* return {
            id: id,
            title: title,
            desc: byline,
            icon: icon,
            image: image,
            reqUrl: request.url
        } */
    }
```

After data is returned to our **handleFetching** function, send the sorted data to another function that will handle the distribution of the data to the Views. Make the data an array, and send it by using the **Spread Operator** <br>

Use **Rest Parameter** in **handleDistribution** to make sure you get data. Then use **Destructuring** of the param to get the data in singles. After it has been destructured send the data to the View. <br>
* We need the { id, title, byline, image } to be passed to the first View.

## View

From the data that we got from **handleDistribution** { id, title, byline, image }, we need to create to items, one singule item and a group of items. The first is the big header, we need use all of the params for this one. We can -1 id so we get the current { title, byline, image } from the data, and then we wil display it as a big image in the center of the canvas. <br>

The grouped items is supposed to be clickable objects, so they'll each need a container. For this we will also loop over the param to get the data we need. From the data we can create small boxes each containing their own id, as their each respected goal. There will max be shown 5 of these at a time, so we will make a small function making that possible (Instead of using a for of loop, we can just use a for i loop, which we then can decide the length of the array, we can then just up the number on user interations).