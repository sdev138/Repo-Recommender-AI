import { useState } from 'react';

interface RepoCard {
    name: string;
    description: string;
    language: string;
    url: string;
    stars: number;
}

export default function Repo() {
    const [repos, setRepos] = useState<RepoCard[]>([
        {
            name: "go-patterns",
            description: "Golang design patterns and real-world examples",
            language: "Go",
            url: "https://github.com/tmrts/go-patterns",
            stars: 21000
        },
        {
            name: "learn-go-with-tests",
            description: "Learn Go with test-driven development",
            language: "Go",
            url: "https://github.com/quii/learn-go-with-tests",
            stars: 19000
        }
    ]);

    return (
        <div className="repo-container">
            <h1>Recommended Repositories</h1>
            <div className="repo-grid">
                {repos.map((repo, index) => (
                    <div key={index} className="repo-card">
                        <h2 className="repo-language">{repo.language}</h2>
                        <h2 className="repo-name">{repo.name}</h2>
                        <p className="repo-description">{repo.description}</p>
                        <div className="repo-stats">
                            <span>⭐ {repo.stars.toLocaleString()}</span>
                        </div>
                        <a 
                            href={repo.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="repo-link"
                        >
                            View Repository
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

