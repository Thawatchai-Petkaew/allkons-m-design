# Contributing Guide

## Development Workflow

1. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**:
   - Follow code style
   - Write tests if applicable
   - Update documentation

3. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

4. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style

- Use TypeScript
- Follow ESLint rules
- Use Prettier for formatting (if configured)

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

## Database Changes

When making database changes:

1. Update Prisma schema (`prisma/schema.prisma`)
2. Create migration: `npm run db:migrate`
3. Test migration locally
4. Update documentation if needed

## Pull Request Process

1. Ensure all tests pass
2. Update documentation
3. Get code review approval
4. Merge to main branch

---

**Last Updated**: 2024
