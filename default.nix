{ pkgs ? import <nixpkgs>  {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    # js
    nodejs

    # HTML
    nodePackages.vscode-langservers-extracted

    # ts
     nodePackages.typescript nodePackages.typescript-language-server

    # misc 
    python39Packages.requests heroku
  ];
}
