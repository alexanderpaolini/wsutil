# Workspace Utility

`wsutil` is a workspace utility application.

The main purpose of `wsutil` is to allow for the setup of resumable workspaces.

---

Picture this: 

You're in a new class, Operating Systems with professor Aedo. Now you need 3 main things: The textbook, your notes repo in nvim, and the canvas setup. 

Now wouldn't it be convenient if there was some **utility** application that would let you just open your **workspace** automagically. Something that you could setup once, at the beginning of the semester, and not touch again. Something that would let you get to work immediately.

Now picture *this*:

```bash
$ wsutil create OS
> ok
```

Set the following in the config file:

```json
"cmds": [
        {
          "cmd": "zen-browser",
          "argv": [
            "https://pages.cs.wisc.edu/~remzi/OSTEP/",
            "https://webcourses.ucf.edu/courses/SOME_COURSE_ID"
          ]
        },
        {
          "cmd": "kitty",
          "argv": [
            "--directory=~/Code/COP4600/",
            "nvim",
            "."
          ]
        }
      ]
```

And now that workspace is created.

```bash
$ wsutil open OS
```

---

Documentation is a lot of work. So too is explaining the config file format. See `./src/structures/ConfigHelper.ts`

The default config path is `~/.config/wsutil.json`. Please do note that you can open this by doing:

```bash
$ nvim $(wsutil config)
```
---

Some quality of life features:
 
- `--config=PATH` custom config PATH

