# Security Policy

## Supported Versions

| Version | Supported |
|---------|:---------:|
| 1.x     | ✅        |

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Report vulnerabilities via [GitHub Private Security Advisories](
https://github.com/nkusakula/developer-in-a-day-demo/security/advisories/new).

You will receive a response within **48 hours** acknowledging receipt.
We aim to release a patch within **7 days** for critical vulnerabilities.

## Security Controls in This Repository

| Control | Implementation |
|---------|----------------|
| Secret scanning | GitHub Advanced Security (native) |
| Dependency scanning | Dependabot + `npm audit` |
| Static analysis | CodeQL (JavaScript) + ESLint security plugin |
| Container scanning | Trivy + Grype (SBOM-based) |
| Image signing | Sigstore keyless (OIDC via GitHub Actions) |
| Supply chain | SBOM (SPDX) generated per build |
| Branch protection | Required reviews + status checks on `main` |
| Secrets in CI | GitHub Secrets — never in code or Docker layers |

## Security-Relevant Files

- `Dockerfile` — hardened multi-stage build, non-root user
- `.github/workflows/ci.yml` — security gate definitions
- `.eslintrc.json` — lint rules including security plugin
- `.github/dependabot.yml` — automated dependency updates
