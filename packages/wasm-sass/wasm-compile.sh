#rm -rf ./wasm-sass.* src/*.o
emmake make # create lib/libsass.a from project
emcc -Iinclude/ src/wasm-sass.c lib/libsass.a -o lib/emcc-wasm.html -s NO_DISABLE_EXCEPTION_CATCHING -s NO_EXIT_RUNTIME=1 -s EXPORTED_FUNCTIONS="['_compile_sass']" -s "EXPORTED_RUNTIME_METHODS=['ccall']" # create wasm, js, and html files