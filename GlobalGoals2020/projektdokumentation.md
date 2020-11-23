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

When errorHandling has been succesfully run, send data to a function that can handle the fecthing (**HandleFetching**)

## Controller

Execute **HandleFetching**, try and fetch **List**, after send data to another function which can sort the fetched data.

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

After data is returned to our **HandleFetching** function, send the sorted data to another function that will handle the distribution of the data to the Views. Make the data an array, and send it by using the **Spread Operator** <br>

Use **Rest Parameter** in HandleFetching to make sure you get data. Then use **Destructiring** of the param to get the data in singles. After it has been destructured send the data to the View. <br>
* We need the image, title, byline, image.

## View