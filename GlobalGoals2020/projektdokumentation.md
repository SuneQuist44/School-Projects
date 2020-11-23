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

Create a entry function for the errorHandling. And make it a try and catch function with out functions from our errorHandling js file.

```js
    function checkEntry() {
        try {}
        catch (err) {}
    }
```

* **List** (JSON format)
    Data: { <br>
        * id, title, byline, color, icon, image, request.type, request.url
    }

* **Details** (JSON format)
    Data: { <br>
        * id, title, byline, color, icon, image <br>
        * num_targets, targets, <br>
            * targets.id, targets.goal_id, targets.sort_number, targets.title, targets.description <br>
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

## View