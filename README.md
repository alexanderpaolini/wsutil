# Workspace Utility

`wsutil` is a workspace utility application.

The main purpose of `wsutil` is to allow for the setup of resumable workspaces.

---

Picture this: 

You're in a new class, Operating Systems with the ~~awful~~ professor Aedo. Now you need 3 main things: The textbook, your notes repo in nvim, and the canvas setup. 

Now wouldn't it be convenient if there was some **utility** application that would let you just open your **workspace** automagically. Something that you could setup once, at the beginning of the semester, and not touch again. Something that would let you get to work immediately.

Now picture *this*:

```bash
$ wsutil create OS
> ok
$ wsutil edit OS set dir ~/Documents/UCF/COP4600/
> ok
$ wsutil edit OS add url https://webcourses.ucf.edu/courses/SOME_NUMBER_HERE
> ok
$ wsutil edit OS add url https://pages.cs.wisc.ediu/~remzi/OSTEP/
> ok
$ wsutil edit OS add app kitty -- -e nvim $WS_DIR
> ok
```

And now that workspace is created.

```bash
$ wsutil open OS
```

---

