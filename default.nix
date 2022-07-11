{ pkgs ? import <nixpkgs>  {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    nodejs

    # HTML
    nodePackages.vscode-langservers-extracted

    # TypeScript
     nodePackages.typescript nodePackages.typescript-language-server

    # Python
    python39Packages.requests

    nodePackages."@angular/cli"
  ];
}
