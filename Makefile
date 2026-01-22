ENTRY=src/main.ts
OUTDIR=out

OUTFILE=$(OUTDIR)/wsutil

.PHONY: all build clean

all: build

build:
	mkdir -p $(OUTDIR)
	bun build $(ENTRY) --compile --outfile=$(OUTFILE)

clean:
	rm -f $(OUTFILE)

