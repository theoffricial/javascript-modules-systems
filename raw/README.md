# Universal Module Definition or "UMD"

## Raw JavaScript scripts

This is the original and the first way to load and JavaScript files, the purpose was to have some logic in web applications running over browsers like Chrome.

Raw \<script> loading, where dependencies are implicit, and exports are vomited onto the window object. (Strangely, this convention doesn’t have a name!)

## Example:

```html
<html>
    <body>
        <script>console.log("unicorn")</script>
    </body>
</html>
```